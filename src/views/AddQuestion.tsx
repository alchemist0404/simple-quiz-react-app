import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Button, Container, FormControl, OutlinedInput, FormHelperText, FormLabel, IconButton, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Add, Delete } from '@mui/icons-material';
import { QuestionProps } from './Questions';

interface IERR {
    title?: string;
    options?: string;
}

export default function AddQuestion() {

    const navigate = useNavigate();
    const { id: questionID } = useParams<any>();
    const [title, setTitle] = useState<string>('');
    const [options, setOptions] = useState<Array<string>>(['Option 1']);
    const [errors, setErrors] = useState<IERR>({
        title: '',
        options: ''
    });

    const onChangeTitle = (e: any) => {
        if (e.target.value.length <= 55) setTitle(e.target.value);
        setErrors({
            ...errors,
            title: ''
        })
    }

    const addOption = () => {
        let _options = [...options];
        _options.push(`Option ${_options.length + 1}`);
        options.length < 6 && setOptions(_options);
    }

    const deleteOption = (index: number) => {
        let _options = [...options];
        _options.splice(index, 1);
        setOptions(_options);
    }

    const onChangeOption = (index: number, value: string) => {
        let _options = [...options];
        _options[index] = value;
        setOptions(_options);
    }

    const checkError = () => {
        if (!title.length) {
            setErrors({
                ...errors,
                title: 'Title is required!'
            })
            return false;
        }
        options.map((item: string, idx: number) => {
            if (!item.length) {
                setErrors({
                    ...errors,
                    options: 'Please fill out this option!'
                })
            }
        })
        if (!errors.title || !errors.options) {
            return false;
        } else {
            return true;
        }
    }

    const save = async () => {
        const isError = checkError();
        if (isError) return;
        let data = JSON.parse(window.localStorage.getItem('questions') || '[]');
        let saveData: QuestionProps = {
            quiz_id: questionID ? Number(questionID) : new Date().valueOf(),
            quiz_title: title,
            quiz_options: options
        }
        if (questionID) {
            let index: number = data.findIndex((item: QuestionProps) => item.quiz_id === Number(questionID));
            data[index].quiz_title = title;
            data[index].quiz_options = options;
        } else {
            data.push(saveData);
        }

        window.localStorage.setItem('questions', JSON.stringify(data));

        navigate('/');
    }

    useEffect(() => {
        if (questionID) {
            let data = JSON.parse(window.localStorage.getItem('questions') || '[]');
            let question = data.filter((item: QuestionProps) => item.quiz_id === Number(questionID))[0];
    
            setTitle(question?.quiz_title);
            setOptions(question?.quiz_options);
        }
    }, [questionID])

    return (
        <Container sx={{ py: 4 }}>
            <Grid container justifyContent='space-between'>
                <Typography variant='h3'>{questionID ? `Edit Question` : `Add Question`}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Button variant="text" onClick={() => navigate('/')}>Cancel</Button>
                    <Button variant="outlined" onClick={save} sx={{ ml: 1 }}>Save</Button>
                </Box>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Question Title*</FormLabel>
                    <OutlinedInput
                        value={title}
                        onChange={onChangeTitle}
                        size='small'
                        required
                        error={errors.title?.length ? true : false}
                    />
                    <FormHelperText
                        error={errors.title?.length ? true : false}
                    >
                        {errors.title ? errors.title : `Required (Max 55 characters)`}
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography color='#ffffffb3'>Options</Typography>
                <Stack sx={{ mt: 1 }} spacing={1}>
                    {
                        options.map((item: string, idx: number) => (
                            <Grid container key={idx} sx={{ alignItems: 'center' }}>
                                <FormControl sx={{ flex: 1 }}>
                                    <OutlinedInput
                                        sx={{ flex: 1, mr: 1 }}
                                        value={item}
                                        onChange={(e: any) => onChangeOption(idx, e.target.value)}
                                        size='small'
                                        required
                                        error={errors.options?.length && !options[idx] ? true : false}
                                    />
                                    <FormHelperText
                                        error={errors.options?.length && !options[idx] ? true : false}
                                    >
                                        {errors.options?.length && !options[idx] ? errors.options : ''}
                                    </FormHelperText>
                                </FormControl>
                                <IconButton color='error' onClick={() => deleteOption(idx)}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        ))
                    }
                </Stack>
                <Button variant="outlined" fullWidth startIcon={<Add />} sx={{ mt: 2 }} onClick={addOption}>
                    Add New Option
                </Button>
                <Typography textAlign='center' color='#ffffffb3' variant='caption' component='p'>(max 6 options allowed)</Typography>
            </Box>
        </Container>
    )
}
