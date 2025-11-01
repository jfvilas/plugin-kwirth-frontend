import React, { useState } from 'react'
import { FormControl, Select, MenuItem, Checkbox, Chip, Grid, ListItemText } from '@material-ui/core'
import { ClusterValidPods, getContainerList, getPodList } from '@jfvilas/plugin-kwirth-common'
import { InstanceConfigScopeEnum, parseResources } from '@jfvilas/kwirth-common'

interface IProps {
    onSelect: (namespaces:string[], podNames:string[], containerNames:string[]) => void,
    cluster: ClusterValidPods,
    selectedNamespaces: string[],
    selectedPodNames: string[],
    selectedContainerNames: string[],
    disabled: boolean
}

const ObjectSelector = (props: IProps) => {
    const [render, setRender] = useState(false)
    let pods = props.cluster.pods
    let namespaceList = Array.from(new Set(pods.map(p => p.namespace)))

    const onNamespaceChange = (namespace:string) => {
        let i = props.selectedNamespaces.indexOf(namespace)
        if (i>=0)
            props.selectedNamespaces.splice(i,1)
        else
            props.selectedNamespaces.push(namespace)

        props.selectedPodNames.splice(0,props.selectedPodNames.length)
        let validPods = getPodList(pods, props.selectedNamespaces)
        props.selectedPodNames.push( ...validPods.map(pod => pod.name) )

        props.selectedContainerNames.splice(0,props.selectedContainerNames.length)
        let containers = getContainerList(pods, props.selectedNamespaces, props.selectedPodNames)
        props.selectedContainerNames.push(...containers)
        props.onSelect([...props.selectedNamespaces], [...props.selectedPodNames], [...props.selectedContainerNames])

        setRender(!render)
    }

    const onSelectPod = (event : any) => {
        props.selectedPodNames.splice(0,props.selectedPodNames.length)
        props.selectedPodNames.push( ...event.target.value )

        props.selectedContainerNames.splice(0,props.selectedContainerNames.length)
        let containers = getContainerList(pods, props.selectedNamespaces, props.selectedPodNames)
        if (containers.length===1) props.selectedContainerNames.push(...containers)

        props.onSelect([...props.selectedNamespaces], [...props.selectedPodNames], [...props.selectedContainerNames])

        setRender(!render)
    }

    const onSelectContainer = (event : any) => {
        props.selectedContainerNames.splice(0,props.selectedContainerNames.length)
        props.selectedContainerNames.push( ...event.target.value )
        props.onSelect([...props.selectedNamespaces], [...props.selectedPodNames], [...props.selectedContainerNames])
    }

    const existAccessKey = (namespace:string) => {
        if (!props.cluster.accessKeys.has(InstanceConfigScopeEnum.VIEW)) return false
        let accessKey = props.cluster.accessKeys.get(InstanceConfigScopeEnum.VIEW)
        if (accessKey) {
            let resources = parseResources(accessKey.resources)
            return (resources.find(resource => resource.namespaces === namespace))
        }
        else return false

    }

    return (
        <Grid container direction='column' spacing={0} style={{marginBottom:6, width:'100%'}}>
            <Grid item>
                {
                    namespaceList.map ((namespace,index) => {
                        if (props.disabled) {
                            if (existAccessKey(namespace))
                                return <Chip component={'span'} key={index} label={namespace} variant={props.selectedNamespaces.includes(namespace)?'default':'outlined'} size='small' color='default' />
                            else
                                return <Chip component={'span'} key={index} label={namespace} size='small' color='default' variant={'outlined'}/>
                        }
                        else {
                            if (existAccessKey(namespace))
                                return <Chip component={'span'} key={index} label={namespace} onClick={() => onNamespaceChange(namespace)} variant={props.selectedNamespaces.includes(namespace)?'default':'outlined'} size='small' color='primary' />
                            else
                                return <Chip component={'span'} key={index} label={namespace} size='small' color='secondary' variant={'outlined'}/>
                        }
                    })
                }
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={6}>
                    <FormControl size='small' fullWidth>
                        <Select value={props.selectedPodNames} MenuProps={{variant:'menu'}} multiple onChange={onSelectPod} renderValue={(selected) => (selected as string[]).join(', ')} disabled={props.disabled || props.selectedNamespaces.length===0 || getPodList(pods,props.selectedNamespaces).length===1}>
                            {
                                getPodList(pods, props.selectedNamespaces).map(pod => {
                                    return (
                                        <MenuItem key={pod.name} value={pod.name}>
                                            <Checkbox checked={props.selectedPodNames.includes(pod.name)} />
                                            <ListItemText primary={pod.name} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl size='small' fullWidth>
                        <Select value={props.selectedContainerNames} MenuProps={{variant:'menu'}} multiple onChange={onSelectContainer} renderValue={(selected) => (selected as string[]).join(', ')} disabled={props.disabled || props.selectedPodNames.length===0 || getContainerList(pods, props.selectedNamespaces, props.selectedPodNames).length===1}>
                            {
                                getContainerList(pods, props.selectedNamespaces, props.selectedPodNames).map(container => {
                                    return (
                                        <MenuItem key={container} value={container}>
                                            <Checkbox checked={props.selectedContainerNames.includes(container)} />
                                            <ListItemText primary={container} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    )
}

export { ObjectSelector }