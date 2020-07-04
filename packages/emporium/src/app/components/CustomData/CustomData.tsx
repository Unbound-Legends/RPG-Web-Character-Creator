import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { ErrorBoundary } from '../ErrorBoundary';
import { CustomArchetypes } from './CustomArchetypes';
import { CustomArchetypeTalents } from './CustomArchetypeTalents';
import { CustomCareers } from './CustomCareers';
import { CustomEquipment } from './CustomEquipment';
import { CustomMotivations } from './CustomMotivations';
import { CustomSettings } from './CustomSettings';
import { CustomSkills } from './CustomSkills';
import { CustomTalents } from './CustomTalents';
import { CustomVehicles } from './CustomVehicles';

export const CustomData = () => {
    return (
        <div className="mx-2">
            <Tabs defaultIndex={0}>
                <TabList>
                    <Tab>Archetypes</Tab>
                    <Tab>Archetype Talents</Tab>
                    <Tab>Armor</Tab>
                    <Tab>Careers</Tab>
                    <Tab>Gear</Tab>
                    <Tab>Motivations</Tab>
                    <Tab disabled>Settings</Tab>
                    <Tab>Skills</Tab>
                    <Tab>Talents</Tab>
                    <Tab>Weapons</Tab>
                    <Tab>Vehicles</Tab>
                </TabList>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomArchetypes />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomArchetypeTalents />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomEquipment type="customArmor" />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomCareers />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomEquipment type="customGear" />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomMotivations />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomSettings />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomSkills />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomTalents />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomEquipment type="customWeapons" />
                    </ErrorBoundary>
                </TabPanel>
                <TabPanel className="w-100">
                    <ErrorBoundary>
                        <CustomVehicles />
                    </ErrorBoundary>
                </TabPanel>
            </Tabs>
        </div>
    );
};
