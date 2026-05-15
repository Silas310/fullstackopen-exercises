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

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  const blogsMap = {}; // {name, count}

  // insert and count blogs
  blogs.forEach(element => {
    // author not in map
    if (!blogsMap[element.author]) {
      blogsMap[element.author] = {
        name: element.author,
        count: 1
      }
    } else {
      blogsMap[element.author].count++;
    }
  });

  // find in map the author with most blogs
  let blogsSum = 0;
  let winnerAuthorName = "";
  for (const author in blogsMap) {
    if (blogsMap[author].count > blogsSum) {
      blogsSum = blogsMap[author].count;
      winnerAuthorName = author;
    }
  }

  return {
    name: winnerAuthorName,
    count: blogsSum
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}