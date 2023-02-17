//uso questa classe e lo inietto nel mio componente
export class Paginator{
    static extractPages(data:any[],itemsPerPage:number,pageNumber:number){
        const startIndex = (pageNumber - 1 )*itemsPerPage;
        const endindex = startIndex + itemsPerPage ; 
        const numberOfPages = Math.ceil(data.length/itemsPerPage);
        if(pageNumber>numberOfPages) return []
        return data.slice(startIndex,endindex); // il numero di elementi da mostrare 
    }
}