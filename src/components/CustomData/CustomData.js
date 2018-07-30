import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {CustomSettings} from './';

export const CustomData = () => {
	return (
		<div className='mx-2'>
			<Tabs>
				<TabList>
					<Tab>Settings</Tab>
				</TabList>
				<TabPanel className='w-100'>
					<CustomSettings/>
				</TabPanel>
			</Tabs></div>
	);
};
