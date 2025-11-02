/*
Copyright 2025 Julio Fernandez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react'
import { CardHeader, Divider, Grid, Typography } from '@material-ui/core'
import { IBackendInfo } from '@jfvilas/plugin-kwirth-common'
import { versionGreaterThan } from '@jfvilas/kwirth-common'

interface IProps {
    backendVersion: string
    latestVersions?: IBackendInfo
    ownVersion: string
}

const KwirthNews: React.FC<IProps> = (props: IProps) => {

    let news:string[] = []
    try {
        if (props.latestVersions) {
            if (versionGreaterThan(props.latestVersions['plugin-kwirth-backend'], props.backendVersion)) news.push(`New version of 'plugin-kwirth-backend': you have ${props.backendVersion} and latest is ${props.latestVersions['plugin-kwirth-backend']}`)
            if (versionGreaterThan(props.latestVersions['plugin-kwirth-log'], props.ownVersion)) news.push(`New version of 'plugin-kwirth-log': you have ${props.ownVersion} and latest is ${props.latestVersions['plugin-kwirth-log']}`)
        }
    }
    catch {
    }

    if (news.length===0) return <></>
    
    return (<>
        <CardHeader title={'Kwirth news'} style={{backgroundColor: '#e0e0e0'}}/>
        <Divider/>
        <Grid container direction='column' spacing={0} style={{backgroundColor:'lightgray'}}>
            <Grid item style={{padding:4}}>
                {
                    news.map(n => {
                        return <Typography style={{fontSize:11, marginBottom:6}}>{n}</Typography>
                    })
                }
            </Grid>
        </Grid>
    </>)
}

export { KwirthNews }