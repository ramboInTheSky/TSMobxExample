import styled from '@emotion/styled'
import Paper from '@material-ui/core/Paper'
import { variables } from '../../constants/theme'

export const Wrapper = styled.div`
	display: grid;
	width: 100%;
	/* text-align: center; */
	justify-items: center;
	grid-row-gap: 2rem;
`

export const Heading = styled.div`
	display: flex;
	width: ${variables.columnSize}vw;
	flex-direction: column;
	justify-content: space-around;
`

export const Content = styled.div`
	display: flex;
	width: ${variables.columnSize}vw;
	flex-direction: column;
	justify-content: space-around;
	/* background-color: ${variables.componentBackground}; */
`