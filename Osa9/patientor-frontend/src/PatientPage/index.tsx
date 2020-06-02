import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Table, Icon, List, Divider, Segment } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";

const PatientPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const genderToIconName = (gender: string) => {
    if (gender === 'male')
      return 'mars';
    else if (gender === 'female')
      return 'venus';
    else
      return 'genderless';
  }; 

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
            <List.Content>
              <List.Header>{entry.date}</List.Header>
              {entry.description}
              </List.Content>
            {entry.diagnosisCodes &&
              <List as='ol'>
              {entry.diagnosisCodes.map((code, i) => (
                <List.Item key={i} as='li' value=''>
                  {code} {diagnoses[code] && <i>{diagnoses[code].name}</i>} 
                </List.Item>
              ))}
              </List>}
          </List.Item>
        ))}
        </List>
      </Segment>
      :
      <Container textAlign="center" disabled>
        <h3 style={{color: 'gray'}}>No entries found</h3>
      </Container>
    }
    </div>
  );
};

export default PatientPage;
