Bandas de Bollinger:

Reglas:

- Comprar cuando precio supere banda superior y vuelva a tocar la banda superior
- Vender cuando precio este por debajo de banda inferior y vuelva a tocar la banda inferior

Considerar:
- Stop Loss: Sera igual a la distancia del precio de entrada hasta la media central
Si salta el Stop Loss no abrir posicion hasta llegar nuevamente a la media.

- Take Profit: Banda media. *Cuando toque banda media dos veces.


States:
    - Busqueda: En busca de posicion: si banda superior->state: pre Short. 
                                                banda inferior-> state: pre Long

    - pre Long: toca banda inferior -> Long
    - Long: Abrir posicion en long 
            Poner stop loss a distancia actual hasta media hacia el lado contrario. 
            state -> post Long
    - post Long: Buscar media 
                 si toca media Profit->state: Busqueda 
                 si toca stop loss, perdida-> Reset
    

    - pre Short: si toca banda superior -> Short
    - Short: Abrir posicion en short 
             Poner stop loss a distancia actual hasta media hacia el lado contrario. 
             state -> post Short
    - post Short: Buscar media 
                  si toca media Profit->state: Busqueda 
                  si toca stop loss, perdida-> Reset
    
    - Reset: Busca Media sin tomar posicion
             si toca media -> state: Busqueda


Datos a considerar:

    - Precio BTC actual
    - Banda de Bollinger:
            banda media
            banda superior
            banda inferior



