export const asyncForEach = async (array, cb) => {
	for (let index = 0; index < array.length; index++) {
		await cb(array[index], index, array);
	}
};