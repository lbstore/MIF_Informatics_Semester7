

data Pairs a = Pr a a


instance Show (Pairs a) where
    show = display
            
            
display (Pr a1 a2) = "[" ++ sa ++","++ sb ++ "]"
        where   
            sa = show a1
            sb = show a2
