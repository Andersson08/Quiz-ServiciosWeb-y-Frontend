from django.urls import path

from .views import LibroEliminar, LibroListaCrear

urlpatterns = [
    path('libros', LibroListaCrear.as_view(), name='libros'),
    path('libros/<int:pk>', LibroEliminar.as_view(), name='libro-eliminar'),
]
