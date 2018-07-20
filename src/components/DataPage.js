import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {ImportExport} from './index';

export const DataPage = () => {
	return (
		<Container className='mx-2'>
			<Row>
				<Col>
					<ImportExport/>
				</Col>
			</Row>
		</Container>
	)
};