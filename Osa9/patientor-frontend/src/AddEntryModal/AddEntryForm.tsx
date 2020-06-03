import React from "react";
import { Grid, Button, Container } from "semantic-ui-react";
import { Field, Formik, Form, FormikProps } from "formik";

import { TextField, DiagnosisSelection, NumberField} from "./FormField";
import { EntryFormValues } from "../types";
import { useStateValue } from "../state";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

interface Props {
  entryType: EntryFormValues['type'];
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface FormikContentProps {
  formikProps: FormikProps<EntryFormValues>;
  onCancel: () => void;
}


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const getInitialValuesForEntryType = (
  entryType: EntryFormValues['type']
  ): EntryFormValues | undefined => {
  const baseValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: []
  };
  
  switch (entryType) {
    case "Hospital":
      return {
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        },
        ...baseValues
      };
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: 0,
        ...baseValues
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        ...baseValues
      };
    default:
      assertNever(entryType);
  }
};

const EntryTypeFields: React.FC<{ entryType: EntryFormValues['type'] }> = ({ entryType }) => {
  switch (entryType) {
    case "Hospital":
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case "HealthCheck":
      return (
        <>
          <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        </>
      );
      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
        );
  }
};

const FormikContent: React.FC<FormikContentProps> = ({formikProps, onCancel}) => {
  const [{ diagnoses }] = useStateValue();
  const { isValid, dirty, setFieldValue, setFieldTouched, values } = formikProps;
  
  return (
    <Form className="form ui">
    <Container textAlign="center">
      <h3>{values.type} entry</h3>
    </Container>
      <Field
        label="Description"
        placeholder="Description"
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Specialist"
        name="specialist"
        component={TextField}
      />
      <EntryTypeFields entryType={values.type}/>
      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={Object.values(diagnoses)}
      />
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={onCancel} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={!dirty || !isValid}
          >
            Add
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateEntryFormValues = (values: EntryFormValues): any => {
  const requiredError = "Field is required";
  const invalidDateError = "Invalid date format";
  const invalidInteger = "Value must be an integer";
  const invalidHealthCheckRating = "Health check rating must be between 0 and 3";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = {};

  if (!values.type) {
    errors.type = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  } else if (!isDate(values.date)) {
    errors.date = invalidDateError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }

  switch (values.type) {
    case "Hospital":
      if (!values.discharge.date) {
        errors.discharge = {
          date: requiredError,
          ...errors.discharge
        };
      } else if (!isDate(values.discharge.date)) {
        errors.discharge = {
          date: invalidDateError,
          ...errors.discharge
        };            }
      if (!values.discharge.criteria) {
        errors.discharge = {
          criteria: requiredError,
          ...errors.discharge
        };
      }
      break;
    case "HealthCheck":
      if (!Number.isInteger(values.healthCheckRating)) {
        errors.healthCheckRating = invalidInteger;
      } else if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
        errors.healthCheckRating = invalidHealthCheckRating;
      }
      break;
    case "OccupationalHealthcare":
      if (!values.employerName)
        errors.employerName = requiredError;
      if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
        if (!values.sickLeave.startDate) {
          errors.sickLeave = {
            startDate: requiredError,
            ...errors.sickLeave
          };
        } else if (!isDate(values.sickLeave.startDate)) {
          errors.sickLeave = {
            startDate: invalidDateError,
            ...errors.sickLeave
          };
        }
        if (!values.sickLeave.endDate) {
          errors.sickLeave = {
            endDate: requiredError,
            ...errors.sickLeave
          };
        } else if (!isDate(values.sickLeave.endDate)) {
          errors.sickLeave = {
            endDate: invalidDateError,
            ...errors.sickLeave
          };
        }
      }
  }

  console.log('errors', errors);

  return errors;
};

export const AddEntryForm: React.FC<Props> = ({ entryType, onSubmit, onCancel }) => {
  const initialValues = getInitialValuesForEntryType(entryType);

  if (!initialValues)
    return null;
  
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validateEntryFormValues}
        enableReinitialize={true}
      >
        {props => {
          return (
            <FormikContent
              formikProps={props}
              onCancel={onCancel}/>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEntryForm;
