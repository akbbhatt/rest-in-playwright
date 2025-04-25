import Ajv from 'ajv';

export function validateSchema(schema: any, data: any): { validate: boolean; errors: any } {
    const ajv = new Ajv();
    let errors;
    const validate = ajv.validate(schema, data);
    if (!validate) {
        errors = ajv.errors;
    }
    return { validate, errors };
}
