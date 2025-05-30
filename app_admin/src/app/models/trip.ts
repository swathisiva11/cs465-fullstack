export interface Trip{
    _id: string,  //Internal primary key in mongoDb
    code: string,
    name: string,
    length: string,
    start: Date,
    resort: string,
    perPerson: string,
    image: string,
    description: string, 
    rank?: number;          // Adding optional rank score (only present in search results)
}