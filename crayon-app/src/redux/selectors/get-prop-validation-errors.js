import { createSelector } from 'reselect';

const fieldName = (state, props) => props.name;
const validationErrors = (state) => state.itemModal.validationErrors;

export const getPropValidationErrors = createSelector(
    [ fieldName, validationErrors ],
    (name, errors) => {
        if (!errors) {
            return [];
        }

        return errors.filter((e) => e.itemName === name);
    }
);
