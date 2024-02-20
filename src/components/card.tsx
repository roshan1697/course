
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const CardLayout = (course) => {
  const navigate = useNavigate()
  
  const handleView = () =>{
      navigate('/courseapp/courses/course/'+ course.course._id)
  }
  const handleEdit = () =>{
    navigate('/courseapp/course/edit/'+ course.course._id)
  }

  return (
    <Card sx={{ width:340, height:400 }}>
    <CardMedia
      sx={{ height: 200 }}
      image="https://images.inc.com/uploaded_files/image/1920x1080/getty_933383882_2000133420009280345_410292.jpg"
      title="course"
    />
    <div style={{
      
      padding:'1rem',
      display:'flex',
      flexWrap:'wrap'
    }}  >
      <Typography gutterBottom 
      style={{
        width:'100%'
      }}
      variant="h5" component="div">
        {course.course.title}
      </Typography>
      <Typography variant="body2"
        style={{
          width:'100%',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          overflow: 'hidden',
        }}
      color="text.secondary">
        {course.course.description}
      </Typography>
      
    </div>
    <Typography gutterBottom variant="h5"
        style={{
          marginTop:'1rem',
          marginLeft:'1rem'
        }}
      component="div">
        ₹{course.course.price}
      </Typography>
        <div style={{
        
          display:'flex',
          justifyContent:'space-between',
          
        }}>

      <Button 
        onClick={handleView}
        style={{
          paddingLeft:'1rem'
        }}
        size="large">View</Button>
      <Button
        onClick={handleEdit}
        style={{
          paddingRight:'1rem'
        }}
        size="large">Edit</Button>
        </div>
    
  </Card>
  )
}

export default CardLayout


