import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Table, Icon, List, Divider, Segment, Button } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, HealthCheckRating } from "../types";
import { useStateValue, setPatient, addEntry } from "../state";

import AddEntryModal from "../AddEntryModal";
import { HospitalEntryFormValues } from "../AddEntryModal/AddEntryForm";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const healthRatingToColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return "black";
      case HealthCheckRating.HighRisk:
        return "purple";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.Healthy:
        return "green";
      default:
        return "grey";
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="stethoscope"/>
            </List.Header>
            {entry.description}
            <br/>
            Rating: <Icon name="heart"
                          color={healthRatingToColor(entry.healthCheckRating)}/>
            <br/>
          </List.Content>
        {entry.diagnosisCodes &&
          <List as='ol'>
          {entry.diagnosisCodes.map((code, i) => (
            <List.Item key={i} as='li' value=''>
              {code} {diagnoses[code] && <i>{diagnoses[code].name}</i>} 
            </List.Item>
          ))}
          </List>
        }
        </>
      );
    case "Hospital":
      return (
        <>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="hospital outline"/>
            </List.Header>
            {entry.description}
            <br/>
            Discharged at {entry.discharge.date}. Criteria: {entry.discharge.criteria}
          </List.Content>
        {entry.diagnosisCodes &&
          <List as='ol'>
          {entry.diagnosisCodes.map((code, i) => (
            <List.Item key={i} as='li' value=''>
              {code} {diagnoses[code] && <i>{diagnoses[code].name}</i>} 
            </List.Item>
          ))}
          </List>
        }
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <List.Content>
            <List.Header>
              {entry.date} <Icon name="user md"/>
            </List.Header>
            {entry.description}
            <br/>
          {entry.sickLeave &&
            <>
              Sick leave from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
            </>
          }
            <br/>
              Employer: {entry.employerName}
          </List.Content>
        {entry.diagnosisCodes &&
          <List as='ol'>
          {entry.diagnosisCodes.map((code, i) => (
            <List.Item key={i} as='li' value=''>
              {code} {diagnoses[code] && <i>{diagnoses[code].name}</i>} 
            </List.Item>
          ))}
          </List>
        }
        </>
      );
    default:
      return assertNever(entry);
  }
};

const PatientPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (patient && patient.id === id) return;

    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  if (!patient || patient.id !== id) {
    return null;
  }

  const genderToIconName = (gender: string) => {
    if (gender === 'male')
      return 'mars';
    else if (gender === 'female')
      return 'venus';
    else
      return 'genderless';
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
  const submitNewEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry)); 
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Container textAlign="center">
        <h3>{patient.name} <Icon name={genderToIconName(patient.gender)}/></h3>
      </Container>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>SSN</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Date of birth</Table.Cell>
            <Table.Cell>{patient.dateOfBirth}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br/>
      <Divider horizontal>
        Entries
      </Divider>
    {patient.entries.length !== 0 ?
      <Segment>
        <List divided relaxed>
        {patient.entries.map((entry, i) => (
          <List.Item key={i}>
            <EntryDetails entry={entry}/>
          </List.Item>
        ))}
        </List>
      </Segment>
      :
      <Container textAlign="center" disabled>
        <h3 style={{color: 'gray'}}>No entries found</h3>
      </Container>
    }
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
