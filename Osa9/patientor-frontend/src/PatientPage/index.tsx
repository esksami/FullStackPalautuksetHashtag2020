import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Container, Table, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";

const PatientPage: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [{ patient }, dispatch] = useStateValue();
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
    </div>
  );
};

export default PatientPage;
