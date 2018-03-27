collectWordsInner text inWord currentWord words
    | length text == 0 = if not isEmpty then words ++ [currentWord] else words
    | inWord == False = collectWordsInner (tail text) status (if status then [firstChar] else "") newWords
    | otherwise = collectWordsInner (tail text) status newWord newWords
    where 
        lastWord = length(tail text) == 0
        firstChar = head text
        status = elem firstChar alphabet
        isEmpty = length currentWord == 0
        newWord = if status then currentWord ++ [firstChar] else "";
        newWords = words ++ if not status && not isEmpty then [currentWord] else []
        
collectWords text = collectWordsInner text False "" []  
