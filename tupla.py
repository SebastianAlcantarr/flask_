#Una tupla no se puede modificar , no agregar eliminar , nada se usan para colecciones de datos que
# no cambian por el tiempo
#Para una tupla se usan ()
# Existen las tuplas mixtas

print("**Manejo de Tuplas**")
mi_tupla = (1, 'string', 4)
mi_segunda_tupla = (2, 2, 3)
tuplaUnitaria = (0,)
for s in mi_tupla:
    print(s, end=" ")


#Tupla para coordenada X Y

coordenada=(3,5)

#Accedemos a las tuplas

print(f'\nCoordenada en X : {coordenada[0]}')

print(f'\nCoordenada en Y : {coordenada[1]}')

#tupla de un elemento

tupla= (0,(1,2),(3,4),(5,6))

print(tupla[1])