from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LibroSerializer

libros = [
    {'id': 1, 'titulo': 'Cien años de soledad', 'autor': 'Gabriel García Márquez'},
    {'id': 2, 'titulo': 'Rayuela', 'autor': 'Julio Cortázar'},
]
siguiente_id = 3


class LibroListaCrear(APIView):
    @extend_schema(
        summary='Listar los libros',
        responses={200: LibroSerializer(many=True)},
    )
    def get(self, request):
        return Response(LibroSerializer(libros, many=True).data)

    @extend_schema(
        summary='Crear un libro',
        request=LibroSerializer,
        responses={
            201: LibroSerializer,
            400: OpenApiResponse(description='Falta el título o el autor'),
        },
    )
    def post(self, request):
        global siguiente_id
        serializer = LibroSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        libro = {'id': siguiente_id, **serializer.validated_data}
        siguiente_id += 1
        libros.append(libro)
        return Response(LibroSerializer(libro).data, status=status.HTTP_201_CREATED)


class LibroEliminar(APIView):
    @extend_schema(
        summary='Eliminar un libro',
        responses={
            204: OpenApiResponse(description='Libro eliminado'),
            404: OpenApiResponse(description='El libro no existe'),
        },
    )
    def delete(self, request, pk):
        for libro in libros:
            if libro['id'] == pk:
                libros.remove(libro)
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'El libro no existe'}, status=status.HTTP_404_NOT_FOUND)
