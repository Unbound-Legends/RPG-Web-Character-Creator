import React from 'react';
import { Button, Row } from 'reactstrap';

export const About = () => {
    return (
        <div>
            <Row className="justify-content-center">
                Created by&nbsp;
                <a
                    href="https://github.com/SkyJedi"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    SkyJedi
                </a>
                . Maintained by&nbsp;
                <a
                    href="https://discord.gg/cpcred4"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Unbound Legends
                </a>
                .
            </Row>
            <Row className="justify-content-center">
                <Button
                    color="link"
                    href="https://www.facebook.com/groups/GenesysRPG"
                    target="_blank"
                    className="p-0 m-2"
                >
                    Facebook Group
                </Button>
                <Button
                    color="link"
                    href="https://www.reddit.com/r/genesysrpg/"
                    target="_blank"
                    className="p-0 m-2"
                >
                    Subreddit
                </Button>
                <Button
                    color="link"
                    href="http://discord.gg/3vNJa6t"
                    target="_blank"
                    className="p-0 m-2"
                >
                    Genesys Community Discord
                </Button>
                <Button
                    color="link"
                    href="https://discord.gg/cpcred4"
                    target="_blank"
                    className="p-0 m-2"
                >
                    Unbound Legends Discord
                </Button>
            </Row>
            <Row className="justify-content-center">
                Contributions by Nick Holmstead.
            </Row>
            <Row className="justify-content-center">
                Images by&nbsp;
                <a
                    href="http://bigevil.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    DrainSmith
                </a>
                . &nbsp;
            </Row>
            <Row className="justify-content-center">
                A Character Creator for&nbsp;
                <a
                    href="http://fantasyflightgames.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Fantasy Flight Games&apos;
                </a>
                ,&nbsp;
                <a
                    href="https://www.fantasyflightgames.com/en/products/genesys/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Genesys
                </a>
                .
            </Row>
            <Row className="justify-content-center">
                <a
                    href="https://github.com/Unbound-Legends/RPG-Web-Character-Creator"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source Code
                </a>
                {/* TODO: Add dynamic version support that doesn't use package.json */}
                &nbsp;v0.2.1.3
            </Row>
        </div>
    );
};
