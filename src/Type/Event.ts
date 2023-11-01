export declare type NewEvent = {
    eventName : string,
    eventDescription : string,
    location : string,
    mapLink : string,
    startDate : Date,
    endDate : Date,
    registrationStartDate : Date,
    registrationEndDate : Date,
    price : Number,
    posterImages : string,
    availableSeats : Number,
    eventStatus : string
};

export declare type getEvent = {
    eventId : BigInt
    eventName : string,
    eventDescription : string,
    location : string,
    mapLink : string,
    startDate : Date,
    endDate : Date,
    registrationStartDate : Date,
    registrationEndDate : Date,
    price : Number,
    posterImages : string,
    availableSeats : Number,
    eventStatus : string
};

export declare type getAllEvents = {
    eventId : BigInt
    eventName : string,
    eventDescription : string,
    location : string,
    mapLink : string,
    startDate : Date,
    endDate : Date,
    registrationStartDate : Date,
    registrationEndDate : Date,
    price : Number,
    posterImages : string,
    availableSeats : Number,
    eventStatus : string,
    userName : string,
    createdAt : Date,
    updatedAt : Date
};