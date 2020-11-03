import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { Fireworks } from 'fireworks/lib/react'

import "./Sudoku.css"
import Header from '../components/Header';
import Grid_9x9 from '../components/Grid_9x9';
import ScreenInputKeyBoard from '../components/ScreenInputKeyBoard'
import { problemList } from "../problems"

class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, // Return loading effect if this is true.
            problem: null, // Stores problem data. See "../problems/" for more information.This is the origin problem and should not be modified. This is used to distinguish the fixed numbers from the editable values
            gridValues: null,  // A 2D array storing the current values on the gameboard. You should update this when updating the game board values.
            selectedGrid: { row_index: -1, col_index: -1 }, // This objecct store the current selected grid position. Update this when a new grid is selected.
            gameBoardBorderStyle: "8px solid #000", // This stores the gameBoarderStyle and is passed to the gameboard div. Update this to have a error effect (Bonus #2).
            completeFlag: false, // Set this flag to true when you wnat to set off the firework effect.
            conflicts: [{ row_index: -1, col_index: -1 }] // The array stores all the conflicts positions triggered at this moment. Update the array whenever you needed.
        }
    }

    handle_grid_1x1_click = (row_index, col_index) => {
        // TODO
        //console.log(this.state.gridValues[row_index][col_index]);
        if(this.state.problem.content[row_index][col_index] === "0"){
            //console.log("selectable");
            this.setState({
                selectedGrid: {row_index: row_index, col_index: col_index},
            });
        }
        else{
            this.setState({
                selectedGrid: {row_index: -1, col_index: -1},
            });
        }
        
        // Useful hints:
        // console.log(row_index, col_index);
        // console.log(this.state.selectedGrid)
    }

    handleKeyDownEvent = (event) => {
        // TODO
        let check = true;
        let newConflicts = [];
        if (this.state.gridValues !== null && this.state.selectedGrid.row_index !== -1 && this.state.selectedGrid.col_index !== -1 && (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
            
            // check row & col
            for(let i = 0; i < 9; i++){
                if(i !== this.state.selectedGrid.col_index && this.state.problem.content[this.state.selectedGrid.row_index][i] === event.key && event.key !== "0"){
                    check = false;
                    let newConflict = {};
                    newConflict.row_index =  this.state.selectedGrid.row_index;
                    newConflict.col_index =  i;
                    newConflicts = [...newConflicts, newConflict];
                }
                if(i !== this.state.selectedGrid.row_index && this.state.problem.content[i][this.state.selectedGrid.col_index] === event.key && event.key !== "0"){
                    check = false;
                    let newConflict = {};
                    newConflict.row_index =  i;
                    newConflict.col_index =  this.state.selectedGrid.col_index;
                    newConflicts = [...newConflicts, newConflict];
                }
            }

            //check square
            let i_row = parseInt(this.state.selectedGrid.row_index/3, 10);
            let i_col = parseInt(this.state.selectedGrid.col_index/3, 10);
            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    if(i !== this.state.selectedGrid.row_index && j !== this.state.selectedGrid.col_index && this.state.problem.content[i_row*3+i][i_col*3+j] === event.key && event.key !== "0"){
                        check = false;
                        let newConflict = {};
                        newConflict.row_index = i_row*3+i;
                        newConflict.col_index = i_col*3+j;
                        newConflicts = [...newConflicts, newConflict];
                    }
                }
            }

            if(check === true){
                let newGridValues = this.state.gridValues;
                newGridValues[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = event.key;
                this.setState({
                    gridValues: newGridValues,
                });
            }
            
            this.setState({
                conflicts: newConflicts,
            });
        }
        // Useful hints:
        // console.log(event)
        // if (this.state.gridValues !== null && this.state.selectedGrid.row_index !== -1 && this.state.selectedGrid.col_index !== -1 && (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {}
        // if (this.state.problem.content[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] === "0") {}
    }

    handleScreenKeyboardInput = (num) => {
        // TODO
        let check = true;
        let newConflicts = [];
        if (this.state.gridValues !== null && this.state.selectedGrid.row_index !== -1 && this.state.selectedGrid.col_index !== -1) {
            
            // check row & col
            for(let i = 0; i < 9; i++){
                if(i !== this.state.selectedGrid.col_index && this.state.problem.content[this.state.selectedGrid.row_index][i] === num.toString() && num !== 0){
                    check = false;
                    let newConflict = {};
                    newConflict.row_index =  this.state.selectedGrid.row_index;
                    newConflict.col_index =  i;
                    newConflicts = [...newConflicts, newConflict];
                }
                if(i !== this.state.selectedGrid.row_index && this.state.problem.content[i][this.state.selectedGrid.col_index] === num.toString() && num !== 0){
                    check = false;
                    let newConflict = {};
                    newConflict.row_index =  i;
                    newConflict.col_index =  this.state.selectedGrid.col_index;
                    newConflicts = [...newConflicts, newConflict];
                }
            }

            //check square
            let i_row = parseInt(this.state.selectedGrid.row_index/3, 10);
            let i_col = parseInt(this.state.selectedGrid.col_index/3, 10);
            for(let i=0; i<3; i++){
                for(let j=0; j<3; j++){
                    if(i !== this.state.selectedGrid.row_index && j !== this.state.selectedGrid.col_index && this.state.problem.content[i_row*3+i][i_col*3+j] === num.toString() && num !== 0){
                        check = false;
                        let newConflict = {};
                        newConflict.row_index = i_row*3+i;
                        newConflict.col_index = i_col*3+j;
                        newConflicts = [...newConflicts, newConflict];
                    }
                }
            }

            if(check === true){
                let newGridValues = this.state.gridValues;
                newGridValues[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = num.toString();
                this.setState({
                    gridValues: newGridValues,
                });
            }
            
            this.setState({
                conflicts: newConflicts,
            });
        }
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDownEvent);
    }

    loadProblem = async (name) => {
        this.setState({
            loading: true,
            problem: null,
            gridValues: null,
            selectedGrid: { row_index: -1, col_index: -1 }
        });

        const problem = await require(`../problems/${name}`)
        if (problem.content !== undefined) {
            let gridValues = [];
            for (let i = 0; i < problem.content.length; i++)
                gridValues[i] = problem.content[i].slice();
            this.setState({ problem: problem, gridValues: gridValues, loading: false });
        }
    }

    extractArray(array, col_index, row_index) {
        let rt = []
        for (let i = row_index; i < row_index + 3; i++) {
            for (let j = col_index; j < col_index + 3; j++) {
                rt.push(array[i][j])
            }
        }
        return rt;
    }

    render() {
        const fxProps = {
            count: 3,
            interval: 700,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            colors: ['#cc3333', '#81C784'],
            calc: (props, i) => ({
                ...props,
                x: (i + 1) * (window.innerWidth / 3) * Math.random(),
                y: window.innerHeight * Math.random()
            })
        }
        return (
            <>
                <Header problemList={problemList} loadProblem={this.loadProblem} gridValues={this.state.gridValues} problem={this.state.problem} />
                {this.state.loading ? (<ReactLoading type={"bars"} color={"#777"} height={"40vh"} width={"40vh"} />) : (
                    <div id="game-board" className="gameBoard" style={{ border: this.state.gameBoardBorderStyle }}>
                        <div className="row">
                            <Grid_9x9 row_offset={0} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={3} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={6} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                    </div>
                )}
                {this.state.completeFlag ? (<Fireworks {...fxProps} />) : null}
                {this.state.loading ? null : (<ScreenInputKeyBoard handleScreenKeyboardInput={this.handleScreenKeyboardInput} />)}
            </>
        );
    }
}

export default Sudoku;