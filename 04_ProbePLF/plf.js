export class Frage{
    constructor(frage, optionen, antwort) {
        if (typeof frage !== "string") 
            throw new Error("frage muss ein String sein"); 
        this.frage = frage;
        if(typeof antwort !== "string") 
            throw new Error("antwort muss ein String sein"); 
        this.antwort = antwort;
        if(!Array.isArray(optionen) && optionen.length == 0)
            throw new Error("optionen muss ein Array sein");
        this.optionen = optionen;
    }
}
