def take_modulus(shift)
  if(shift > 25)
    return shift % 26
  elsif (shift < -25)
    return (shift.abs % 26) * -1
  else
    return shift
  end
end

def wrap_caesar(letter_ord,shift,limit)

  #handle large shift values
  shift = take_modulus(shift)

  #lowercase ================================================================>
  if(letter_ord.between?(limit[2],limit[3]))
    
    #no wrap letters
    if((letter_ord + shift).between?(limit[2],limit[3]))
      return (letter_ord + shift).chr

    #wrap lowercase letters
    elsif (shift > 0)
      return (((letter_ord + shift) - limit[3]) + limit[2]).chr

    else #shift is negative
      return (((letter_ord - limit[2] + 1) + shift) + limit[3]).chr
    end
  else #uppercase ===========================================================>

    #no wrap letters
    if((letter_ord + shift).between?(limit[0],limit[1]))
      return (letter_ord + shift).chr

    #wrap uppercase letters
    elsif (shift > 0)
      return (((letter_ord + shift) - limit[1]) + limit[0]).chr

    else #shift is negative
      return (((letter_ord - limit[0] + 1) + shift) + limit[1]).chr
    end
  end
end

def caesar(word,shift)

  limit = [65,90,97,122] #ascii code bounds for upper and lower cases
  out = word.split('').reduce([]) do |cipher,letter|
    if(letter.ord.between?(limit[0],limit[1]) || letter.ord.between?(limit[2],limit[3]))
      code = wrap_caesar(letter.ord,shift,limit)
      cipher.push(code) #shifts only letters a-z A-Z
    else
      cipher.push(letter) #everything else is passed through
    end
  end
  out.join
end