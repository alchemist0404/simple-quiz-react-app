import { Box, Typography, Grid, Button, Stack, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface QuestionProps {
	quiz_id?: number;
	quiz_title?: string;
	quiz_options?: string[];
}

export default function Questions() {

	const navigate = useNavigate();

	const [questions, setQuestions] = useState<Array<QuestionProps>>([]);
	const [active, setActive] = useState<number>(0);

	const deleteQuiz = (quiz_id: number) => {
		let data: QuestionProps[] = JSON.parse(window.localStorage.getItem('questions') || '[]');
		let index: number = data.findIndex((item: QuestionProps) => item.quiz_id === quiz_id);
		data.splice(index, 1);

		setQuestions(data);
		window.localStorage.setItem('questions', JSON.stringify(data));
	}

	useEffect(() => {
		let data = JSON.parse(window.localStorage.getItem('questions') || '[]');
		setQuestions(data);
	}, [])

	return (
		<Box sx={{ p: 2 }}>
			<Typography variant="h2" fontWeight='bold' textAlign='center'>Questions</Typography>
			<Grid sx={{ mt: 2 }}>
				<Button variant='outlined' onClick={() => navigate('/add-question')}>Add Question</Button>
				<Stack sx={{ mt: 2 }} spacing={1}>
					{
						questions.map((item: QuestionProps) => (
							<Grid
								key={item.quiz_id}
								sx={{
									bgcolor: '#001e3c',
									p: 2,
									borderRadius: 2,
									cursor: 'pointer'
								}}
								onClick={() => setActive(active === Number(item.quiz_id) ? 0 : Number(item.quiz_id))}
							>
								<Grid
									container
									alignItems='center'
									justifyContent='space-between'
								>
									<Typography color='#ffffffb3' variant='h6'>{item.quiz_title}</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center'
										}}
									>
										<Button variant="outlined" onClick={() => navigate(`/edit-question/${item.quiz_id}`)}>Edit</Button>
										<Button variant="outlined" color='error' onClick={() => deleteQuiz(Number(item.quiz_id))} sx={{ ml: 1 }}>Delete</Button>
									</Box>
								</Grid>
								<Collapse in={Number(item.quiz_id) === active}>
									<Grid container sx={{ p: 1 }} flexDirection='column'>
										{
											item?.quiz_options?.map((option: string, idx: number) => (
												<Typography key={idx} color='#ffffffb3' variant='body2'>{`∙ ${option}`}</Typography>
											))
										}
									</Grid>
								</Collapse>
							</Grid>
						))
					}
				</Stack>
			</Grid>
		</Box>
	);
}
