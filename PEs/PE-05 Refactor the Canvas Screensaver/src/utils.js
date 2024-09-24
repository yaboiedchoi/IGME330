export const getRandomColor = () => {
  	const getByte = () => {
    	return 55 + Math.round(Math.random() * 200);
  	}
  	return `rgba(${getByte()},${getByte()},${getByte()},.95)`;
}

export const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}