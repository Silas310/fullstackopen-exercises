const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0;
  }
 
  return blogs.reduce( (total, currentValue) => {
    return total + currentValue.likes;
  }, 0);
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce( (favorite, currentValue) => {
    return (currentValue.likes > favorite.likes) ? currentValue : favorite;
  }, blogs[0]);

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}