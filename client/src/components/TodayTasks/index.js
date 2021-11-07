import React from "react";
import { gql, useQuery } from "@apollo/client";

import "../common/Styles/commonStyles.css";
import "./Today.css";
import Form from "../common/Form";
import TaskCard from "./TaskCard";
const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      name
      category
      priorityLevel
      duration
      isDone
    }
  }
`;
const Today = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error</div>;
  return (
    <div className="container">
      <div className="wrapper">
        <Form />
      </div>
      <div className="tasks-container">
        {data &&
          data.tasks.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default Today;
