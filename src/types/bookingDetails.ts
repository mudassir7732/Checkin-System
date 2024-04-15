export interface BookingDetailsProps{
    bookingId: string;
    rooms:number | null;
    guests:number | null;
    bookingDate:Date | string
}