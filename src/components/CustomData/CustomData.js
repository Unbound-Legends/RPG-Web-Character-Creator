import React from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {
	CustomArchetypes,
	CustomArchetypeTalents,
	CustomCareers,
	CustomEquipment,
	CustomMotivations,
	CustomSettings,
	CustomSkills,
	CustomTalents
} from './';

export const CustomData = () => {
	return (
		<div className='mx-2'>
			<Tabs defaultIndex={0}>
				<TabList>
					<Tab>Archetypes</Tab>
					<Tab>Archetype Talents</Tab>
					<Tab>Armor</Tab>
					<Tab>Careers</Tab>
					<Tab>Gear</Tab>
					<Tab>Motivations</Tab>
					<Tab>Settings</Tab>
					<Tab>Skills</Tab>
					<Tab>Talents</Tab>
					<Tab>Weapons</Tab>
				</TabList>
				<TabPanel className='w-100'>
					<CustomArchetypes/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomArchetypeTalents/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomEquipment type='customArmor'/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomCareers/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomEquipment type='customGear'/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomMotivations/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomSettings/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomSkills/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomTalents/>
				</TabPanel>
				<TabPanel className='w-100'>
					<CustomEquipment type='customWeapons'/>
				</TabPanel>
			</Tabs></div>
	);
};
