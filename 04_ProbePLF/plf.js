export class Frage{
    constructor(frage, optionen, antwort) {
        if(typeof frage !== "string")
            throw new Error("Error");
        if(!Array.isArray(optionen) || optionen.length < 1)
            throw new Error("Error");
        if(typeof frage !== "string")
            throw new Error("Error");
        if(!optionen.includes(antwort))
            throw new Error("error");
        if(arguments.length !== 3) {
            throw new Error("3 arguments")
        }
        this.frage=frage;
        this.optionen=optionen;
        this.antwort=antwort;
    }
}

export class Quiz {
    constructor(fragen) {
        this.fragen = [];
        for(const frage of fragen){
            this.fragen.push(new Frage(frage.frage, frage.optionen, frage.antwort))
        }
    }

    getFragenByLength(l) {
        return this.fragen.filter((frage) => frage.frage.length >= l);
    }

    getFragenSortedByLength() {
        return this.fragen.sort((f1,f2) => f1.frage.length - f2.frage.length);
    }

    getFragenWithOption(opt) {
        return this.fragen.filter((frage) => frage.optionen.includes(opt));
    }

    getAverageOptions() {
        let erg = 0;
        for(const f of this.fragen) {
            erg += f.optionen.length;
        }
        return erg / this.fragen.length;
    }

    getAllOptions() {
        const erg = [];
        for(const f of this.fragen) {
            erg.push(f.optionen);
        }
        return erg;
    }


}
