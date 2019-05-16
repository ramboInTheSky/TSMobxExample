export class Tag{
    tagNumber: string | null = null

    constructor(tag?: string){
        this.tagNumber = tag || null
    }
}