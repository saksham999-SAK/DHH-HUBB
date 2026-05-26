import { useState } from 'react';
import '../styles/style.css';

export default function CommentSection({ initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [formData, setFormData] = useState({ pic: '', name: '', occupation: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    setComments([
      ...comments,
      {
        name: formData.name,
        pic: formData.pic || '/pp.png',
        bio: formData.occupation,
        comment: formData.text,
      }
    ]);
    
    setFormData({ pic: '', name: '', occupation: '', text: '' });
  };

  return (
    <div 
      className="con"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "clamp(1rem, 4vw, 2rem)",
        borderRadius: "16px"
      }}
    >
      <div className="main">
        <h3 className="texttt">COMMENT SECTION</h3>
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="pic" placeholder="profile pic URL (optional)" value={formData.pic} onChange={handleChange} />
          <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="occupation" placeholder="occupation" value={formData.occupation} onChange={handleChange} />
          <input type="text" name="text" placeholder="comment" value={formData.text} onChange={handleChange} required />
          <input type="submit" value="Submit" />
        </form>

        {comments.map((c, i) => (
          <div className="card" key={i}>
            <div className="profile">
              <img src={c.pic} alt={c.name} />
            </div>
            <h3>{c.name}</h3>
            <h5>{c.bio}</h5>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
