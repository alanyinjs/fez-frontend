import React from 'react';
import {Card, CardText} from 'material-ui/Card';

export default function About() {
    return (
        <div className="layout-fill">
            <h1 className="page-title display-1">About UQ eSpace</h1>
            <Card className="layout-card">
                <CardText className="body-1">
                    <br />
                    <div>
                        <p>
                            UQ eSpace is the single authoritative source for the research outputs and research data of the staff and students of the University of Queensland and is the archival home of UQ Research Higher Degree digital theses. UQ eSpace raises the visibility and accessibility of UQ publications to the wider world and provides data for mandatory Government reporting requirements such as Excellence in Research for Australia (ERA), as well as for internal UQ systems, including Academic Portal and the DataHub. It operates as an institutional repository for open access publications, research datasets and other digitised materials created by staff of the University such as print materials, photographs, audio materials, videos, manuscripts and other original works. UQ eSpace provides metadata to UQ Researchers in order to raise the publication profile of researchers at UQ.
                        </p>

                        <p>
                            The University of Queensland has implemented an Open Access for UQ Research Outputs policy that requires UQ researchers to make publications arising from their research openly available via UQ eSpace. It has also implemented a Research Data Management policy that sets out the requirements for University of Queensland researchers to ensure that their research data are managed according to legal, statutory, ethical and funding body requirements.
                        </p>
                    </div>
                </CardText>
            </Card>
        </div>
    );
}