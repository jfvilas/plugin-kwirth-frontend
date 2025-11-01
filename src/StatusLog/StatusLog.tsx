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
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import { InstanceMessageTypeEnum, SignalMessageLevelEnum } from '@jfvilas/kwirth-common'
import { IStatusLine } from '@jfvilas/plugin-kwirth-common';

interface IProps {
    level: SignalMessageLevelEnum
    statusMessages: IStatusLine[]
    onClear: (level:SignalMessageLevelEnum) => void
    onClose: () => void
}

const StatusLog = (props:IProps) => {
    return (
        <Dialog open={true}>
            <DialogTitle>
                Status: {props.level} 
            </DialogTitle>
            <DialogContent>
                { props.statusMessages.filter(m => m.type === InstanceMessageTypeEnum.SIGNAL && m.level === props.level).map( (m,index) => <Typography key={index}>{m.text}</Typography>) }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClear(props.level)} color='primary' variant='contained'>Clear</Button>
                <Button onClick={props.onClose} color='primary' variant='contained'>Close</Button>
            </DialogActions>
        </Dialog>
    )

}

export { StatusLog }