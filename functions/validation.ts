export const validateFormOne = (DATA: any) => {
    let valid = true;
    let errors = [];
    if (!DATA.title) {
        valid = false;
        errors.push({
            name: 'TitleError',
            error: 'Required',
        });
    }
    if (!DATA.interests.length) {
        valid = false;
        errors.push({
            name: 'InterestError',
            error: 'Required',
        });
    }
    return {
        valid,
        errors,
    };
};

export const validateFormTwo = (DATA: any) => {
    let valid = true;
    let errors = [];
    if (!DATA.date) {
        valid = false;
        errors.push({
            name: 'DateError',
            error: 'Required',
        });
    }
    if (!DATA.maxCapacity) {
        valid = false;
        errors.push({
            name: 'MaxCapacityError',
            error: 'Required',
        });
    }
    if (!DATA.description) {
        valid = false;
        errors.push({
            name: 'DescriptionError',
            error: 'Required',
        });
    }
    return {
        valid,
        errors,
    };
};

export const validateRegistration = (body: any) => {
    // List of fields to be checked
    const fields = ['name', 'username', 'dateOfBirth', 'email', 'password'];

    for (const field of fields) {
        // Check if the field is undefined, null or empty string
        if (!body[field]) {
            return {
                isValid: false,
                errorMessage: `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`,
                errorField: field,
            };
        }
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(body.email)) {
        return {
            isValid: false,
            errorMessage: 'Invalid email address!',
            errorField: 'email',
        };
    }

    return {
        isValid: true,
        errorMessage: null,
        errorField: null,
    };
};

export const validateLogin = (body: any) => {
    // List of fields to be checked
    const fields = ['email', 'password'];

    for (const field of fields) {
        // Check if the field is undefined, null or empty string
        if (!body[field]) {
            return {
                isValid: false,
                errorMessage: `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`,
                errorField: field,
            };
        }
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(body.email)) {
        return {
            isValid: false,
            errorMessage: 'Invalid email address!',
            errorField: 'email',
        };
    }

    return {
        isValid: true,
        errorMessage: null,
        errorField: null,
    };
};

export const createEventform1Validation = (data: any) => {
    console.log('passed data', data.location.coordinates[0])
    let valid = true;
    let errors = [];
    let { title, description, date, location } = data;

    if (title.trim() === '') {
        errors.push({
            name: 'titleError',
            error: 'Required',
        });
        valid = false;
    }

    if (description.trim() === '') {
        errors.push({
            name: 'descriptionError',
            error: 'Required',
        });
        valid = false;
    }

    if (date === '') {
        errors.push({
            name: 'dateError',
            error: 'Required',
        });
        valid = false;
    }
    if (location.coordinates[0] == null || location.coordinates[0] == '' || location.coordinates[0] == undefined) {
        errors.push({
            name: 'locationError',
            error: 'Required',
        });
        valid = false;
    }
    if (location.coordinates[1] == null || location.coordinates[1] == '' || location.coordinates[1] == undefined) {
        errors.push({
            name: 'locationError',
            error: 'Required',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};

export const createEventform2Validation = (data: any) => {
    let valid = true;
    let errors = [];
    let { interests } = data;

    if (interests.length === 0) {
        errors.push({
            name: 'interestsError',
            error: 'Required',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};

export const createEventform3Validation = (data: any) => {
    let valid = true;
    let errors = [];
    let { invitees } = data;

    if (invitees.length === 0) {
        errors.push({
            name: 'inviteesError',
            error: 'Required',
        });
        valid = false;
    }
    return {
        valid,
        errors,
    };
};

export const createInterestValidation = (data: any) => {
    let valid = true;
    let errors = [];
    let { title, image } = data;

    if (title.trim() === '') {
        errors.push({
            name: 'titleError',
            error: 'Required',
        });
        valid = false;
    }

    if (image === '') {
        errors.push({
            name: 'imageError',
            error: 'Required',
        });
        valid = false;
    }

    return {
        valid,
        errors,
    };
};
