import styled from '@emotion/styled'
import { variables } from '../../constants/theme';
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

export const Wrapper = styled.div`

`

export const Container: React.ComponentType<any> = styled(Paper)`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly;
    padding-top: 3rem;
    padding-bottom: 4rem; */
`

export const TitleField = styled.span`
    min-width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const Title = styled.div`
    font-size: ${variables.headerFontSize};
    font-weight: bold;
    padding: ${variables.gutter};
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
`
export const ProfileName = styled.span`
    color: ${variables.primaryColor};
    font-weight: bold;
    padding-right: ${variables.indentation};
    /* font-size: 1.5rem; */
    & svg{
        vertical-align: sub;
    }
`

export const AddTagContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: calc(${variables.gutter} * 2);
`


export const InputContainer: React.ComponentType<any> = styled.div`
	display: flex;
	align-items: center;
    width: 60%;
    min-width: 300px;
`

export const Input: React.ComponentType<any> = styled(TextField)`
    margin-left: 8;
    padding-left: 1rem; 
	flex: 1;
`

export const Action: React.ComponentType<any> = styled(IconButton)`padding: 10;`

export const ActionsBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: ${variables.gutter};
	/* border-bottom: ${variables.spacer}; */
	padding-bottom: calc(${variables.gutter} * 2);
	padding-top: calc(${variables.gutter} * 2);
    margin-top: calc(${variables.gutter} * 2);
	background-color: ${variables.componentBackgroundClear};
    border-top: 1px solid ${variables.componentBackground};
`
export const ButtonsContainer = styled.div`
	& button {
		margin-left: ${variables.indentation};
	}
`

export const VisitDateFrom = styled.span`
    color: ${variables.visitDateFromColor};
    font-style: italic;
`

export const VisitDateTo = styled.span`
    color: ${variables.visitDateToColor};
    font-style: italic;
`
