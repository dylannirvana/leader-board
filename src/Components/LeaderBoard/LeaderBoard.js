import React, { Component } from "react";
// import API from "../../utils/API";
//import MUIDataTable from "mui-datatables";
import { Button, Container, Table, Icon, Form } from "semantic-ui-react";
import Style from "./LeaderBoard.css";

const Input = props => (
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>
);

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [
        {
          id: 1,
          name: "Arnold Palmer",
          total: -12,
          thru: "F",
          today: -1,
          round1: 68,
          round2: 70,
          round3: 68,
          round4: 66
        },
        {
          id: 2,
          name: "Phil Mickelson",
          total: -11,
          thru: "F",
          today: -1,
          round1: 72,
          round2: 63,
          round3: 69,
          round4: 70
        },
        {
          id: 3,
          name: "Tiger Woods",
          total: -13,
          thru: "F",
          today: -1,
          round1: 66,
          round2: 65,
          round3: 65,
          round4: 75
        },
        {
          id: 4,
          name: "Ben Hogan",
          total: -10,
          thru: "F",
          today: -1,
          round1: 69,
          round2: 69,
          round3: 67,
          round4: 68
        },
        {
          id: 5,
          name: "Bobby Jones",
          total: -14,
          thru: "F",
          today: -1,
          round1: 63,
          round2: 69,
          round3: 68,
          round4: 70
        }
      ],
      isDisabled: true,
      column: null,
      columns: [
        "Pos",
        "Player Name",
        "Total",
        "Thru",
        "Today",
        "1",
        "2",
        "3",
        "4",
        "Total",
        "Delete",
        "Edit"
      ],
      direction: "ascending"
    };
    this.sortLeaderBoard = this.sortLeaderBoard.bind(this);
  }

  componentDidMount() {
    this.sortLeaderBoard();
  }

  addTrInfo() {
    const sortedColumn = document.getElementById("pos");
    sortedColumn.createAttribute("assending");
  }

  sortLeaderBoard() {
    //   Add Lodash   here ////////////////////////////
    ///   _.sortBy(playerData, ['pos', 'lastName'])   ///    This is an awesome library :)
    const playerData = this.state.playerData;
    console.log(playerData);
    let sortedPlayerData = playerData.sort((p, p2) => {
      return p.total - p2.total;
    });
    this.setState({
      playerData: sortedPlayerData
    });
  }

  getTableColumns() {
    const columns = this.state.columns;
    const columnData = columns.map((column, index) => (
      <Table.HeaderCell id={column} className={Style.tableHeader}>
        {" "}
        {column}{" "}
      </Table.HeaderCell>
    ));
    return columnData;
  }

  getPlayerData(playerData) {
    const dataRows = playerData.map((item, index) => (
      <Table.Row key={index}>
        <Table.Cell> {index + 1} </Table.Cell>
        <Table.Cell> {item.name} </Table.Cell>
        <Table.Cell> {item.total} </Table.Cell>
        <Table.Cell> {item.thru} </Table.Cell>
        <Table.Cell> {item.today} </Table.Cell>
        <Table.Cell> {item.round1} </Table.Cell>
        <Table.Cell> {item.round2} </Table.Cell>
        <Table.Cell> {item.round3} </Table.Cell>
        <Table.Cell> {item.round4} </Table.Cell>
        <Table.Cell>
          {" "}
          {item.round1 + item.round2 + item.round3 + item.round4}{" "}
        </Table.Cell>
        <Table.Cell>
          <Button
            icon
            color="blue"
            onClick={e => this.handleDelete(item.id, e)}
            className={Style.Button}
          >
            <Icon color="black" name="trash alternate" />
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            icon
            color="blue"
            onClick={e => this.handleEdit(item, e)}
            className={Style.Button}
          >
            <Icon color="brown" name="pencil" />
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
    return dataRows;
  }

  handleDelete(id) {
    let newPlayerData = this.state.playerData;
    newPlayerData = newPlayerData.filter(obj => {
      return obj.id !== id;
    });
    this.setState({
      playerData: newPlayerData
    });
    console.log(this.state.playerData);
  }


  handleEdit(data) {
    alert(`You just clicked edit for${data.name}`);
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      total,
      thru,
      today,
      round1,
      round2,
      round3,
      round4
    } = this.state;
    const players = this.state.playerData;
    const id = players.length + 1;
    const fullName = `${firstName} ${lastName}`;
    const newPlayerData = {
      id: id,
      name: fullName,
      total: parseInt(total),
      thru: thru,
      today: parseInt(today),
      round1: parseInt(round1),
      round2: parseInt(round2),
      round3: parseInt(round3),
      round4: parseInt(round4)
    };
    console.log(newPlayerData);
    let playerData = this.state.playerData;
    playerData = playerData.concat(newPlayerData);
    this.setState({
      playerData: playerData
    });

    console.log(this.state.playerData);
    // this.sortLeaderBoard()
  };

  clearForm() {}

  render() {
    const ColumnHeader = this.getTableColumns();
    return (
      <div>
        <Container className={Style.table}>
          <Table celled color="blue" inverted striped>
            <Table.Header className={Style.tableHeader}>
              <Table.Row>{ColumnHeader}</Table.Row>
            </Table.Header>

            <Table.Body>{this.getPlayerData(this.state.playerData)}</Table.Body>
          </Table>
          {console.log(this.state.playerData)}
          <h3 className="text-center"> New Player Entry</h3>
          <Form className={Style.form}>
            <Input
              className={Style.formInput}
              value={this.state.firstName}
              onChange={this.handleFormChange}
              name="firstName"
              placeholder="First Name"
            />
            <Input
              className={Style.formInput}
              value={this.state.lastName}
              onChange={this.handleFormChange}
              name="lastName"
              placeholder="Last Name"
            />
            <Input
              className={Style.formInput}
              value={this.state.total}
              onChange={this.handleFormChange}
              name="total"
              placeholder="Total"
              type="number"
            />
            <Input
              className={Style.formInput}
              value={this.state.thru}
              onChange={this.handleFormChange}
              name="thru"
              placeholder="Thru"
            />
            <Input
              className={Style.formInput}
              value={parseInt(this.state.today)}
              onChange={this.handleFormChange}
              name="today"
              placeholder="Today"
              type="number"
            />
            <Input
              className={Style.formInput}
              value={this.state.round1}
              onChange={this.handleFormChange}
              name="round1"
              placeholder="Round 1 score"
              type="number"
            />
            <Input
              className={Style.formInput}
              value={this.state.round2}
              onChange={this.handleFormChange}
              name="round2"
              label="round2"
              placeholder="Round 3 score"
            />
            <Input
              className={Style.formInput}
              value={this.state.round3}
              onChange={this.handleFormChange}
              name="round3"
              placeholder="Round 3 score"
              type="number"
            />
            <Input
              className={Style.formInput}
              value={this.state.round4}
              onChange={this.handleFormChange}
              name="round4"
              placeholder="Round 4 score"
              type="number"
            />
            <div className="text-center">
              <Button
                className={Style.formInput}
                onClick={this.handleFormSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default LeaderBoard;
