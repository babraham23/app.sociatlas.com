export class CreateEventForm1Model {
    title?: any;
    description?: any;
    date?: any;
    location?: any;

    titleError?: any;
    descriptionError?: any;
    dateError?: any;
    locationError?: any;

    constructor(data: any = {}) {
        this.title = data.title || '';
        this.description = data.description || '';
        this.date = data.date || '';
        this.location = data.location || '';
    }
}
