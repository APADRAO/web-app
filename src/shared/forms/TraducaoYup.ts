import { object, setLocale } from "yup";

setLocale({
    mixed:{
        default:'Campo não é Válido',
        required:'Campo é Obrigatoria',
    },
    string:{
        email: () => 'O campo precisa conter email Valido',
        max: ({max}) => `O campo pode ter no máximo ${max} caracteres` ,
        min: ({min}) => `O campo pode ter pelo menos ${min} caracteres` ,
        length: ({length}) => `O campo pode ter exatamente ${length} caracteres` 
    },
    date:{
        
        max: ({max}) => `A data deve ser menor que ${max} caracteres` ,
        min: ({min}) => `A data deve ser maior que ${min} caracteres` ,
    },
    number:{
        
        integer: () => 'O campo precisa ter um valor inteiro',
        negative: () => 'O campo precisa ter um valor negativo',
        positive: () => 'O campo precisa ter um valor positivo',
        moreThan: ({more}) => `O campo precisa ter um valor maior que ${more} caracteres` ,
        lessThan: ({less}) => `O campo precisa ter um valor menor que  ${less} caracteres` ,
        max: ({max}) => `O campo procisa ter um valor com mais de ${max} caracteres` ,
        min: ({min}) => `O campo procisa ter um valor com menos de ${min} caracteres` ,
    },
    boolean:{},
    object:{},
    array:{},
});
