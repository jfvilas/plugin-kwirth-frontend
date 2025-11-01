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
}

const KwirthNews = (props: IProps) => {

    let news:string[] = []
    try {
        if (props.latestVersions) {
            if (versionGreaterThan(props.latestVersions['plugin-kwirth-backend'], props.backendVersion)) news.push(`New version of 'plugin-kwirth-backend': your have ${props.backendVersion} and latest is ${props.latestVersions['plugin-kwirth-backend']}`)
            //if (versionGreaterThan(props.latestVersions['plugin-kwirth-log'], VERSION)) news.push(`New version of 'plugin-kwirth-log': your have ${VERSION} and latest is ${props.latestVersions['plugin-kwirth-log']}`)
        }
    }
    catch {
    }

    if (news.length===0) return <></>
    
    return (<>
        <CardHeader title={'Kwirth news'}/>
        <Divider style={{marginTop:8}}/>
        <Grid container direction='column' spacing={0}>
            <Grid item style={{padding:4}}>
                {
                    news.map(n => {
                        return <Typography style={{fontSize:11, marginBottom:6}}>{n}</Typography>
                    })
                }

                <Typography style={{fontSize:9, marginLeft:20, marginTop:4, marginBottom:6}}>Powered by <a href='https://jfvilas.github.io/kwirth/' target='_blank' style={{color:'blue'}}>Kwirth</a></Typography>
            </Grid>
        </Grid>
    </>)
}

export { KwirthNews }