export interface BorrowRecord{
    id:number;
    userId:number;
    bookId:number;
    borrowDate :Date;
    returnDate:Date;
    returned:boolean ;
    fineAmount:number;
    finePaid:boolean;
}