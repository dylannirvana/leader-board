import React, { Component } from "react";
import { Button, Table, Icon, Form, Input } from "semantic-ui-react";
import Style from "./LeaderBoard.css";


class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerData: [
        {
          id: 1,
          firstName: "Arnold",
          lastName: "Palmer", 
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
          firstName: "Phil",
          lastName: "Mickelson",
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
          firstName: "Tiger",
          lastName: "Woods",
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
          firstName: "Ben",
          lastName: "Hogan",
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
          firstName: "Bobby",
          lastName: "Jones",
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
        "Player's Name",
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
      direction: "ascending",
      id: null, 
      firstName: '',
      lastName: '',
      total: '',
      thru: '',
      today: '',
      round1: '',
      round2: '',
      round3: '',
      round4: '',
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
      <Table.HeaderCell key={index} id={column} className={Style.tableHeader}>
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
        <Table.Cell> {item.firstName} {item.lastName } </Table.Cell>
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
    console.log(data)
    this.setState({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,

      data: data,
    })

    console.log(this.state.data)
  }

  handleFormChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    if (this.state.id) {
      this.handleDelete(this.state.id) 
    }
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
    const newPlayerData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
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
    this.clearForm();
  };

  clearForm() {
   /* this.setState({
    id: null, 
    firstName: '',
    lastName: '',
    total: '',
    thru: '',
    today: '',
    round1: '',
    round2: '',
    round3: '',
    round4: '',
    })
  */  }

  render() {
    const ColumnHeader = this.getTableColumns();
    const HeaderStyle = {
      marginTop: '50px'
    }
    const ButtonStyle = {
      margin: '25px 0'
    }
    return (
      <div>
        <div className={Style.table}>
          <Table celled color="blue" inverted striped>
            <Table.Header className={Style.tableHeader}>
              <Table.Row>{ColumnHeader}</Table.Row>
            </Table.Header>

            <Table.Body>{this.getPlayerData(this.state.playerData)}</Table.Body>
          </Table>
         
          <div className={Style.form}>
            <h3 className={Style.formHeader} style={HeaderStyle}> New Player Entry</h3>
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
                placeholder="Round 2 score"
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
                  style={ButtonStyle}

                  onClick={this.handleFormSubmit}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderBoard;
