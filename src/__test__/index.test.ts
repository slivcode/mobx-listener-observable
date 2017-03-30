import ListenerObservable from '../index';
test('listener observable test', () => {
	let onMock = jest.fn();
	let offMock = jest.fn();

	let singleMockOn = jest.fn();
	let singleMockOff = jest.fn();
	singleMockOn.mockReturnValue(singleMockOff);

	let ob = new ListenerObservable({
		first: {
			on: onMock,
			off: offMock,
			active: true,
		},
		singleOn: {
			on: singleMockOn,
			active: true,
		},
	});
	expect(onMock).toBeCalled();
	ob.state.first.active = false;
	expect(offMock).toBeCalled();
	ob.state.first.active = true;
	expect(onMock).toHaveBeenCalledTimes(2);
	ob.state.first.active = false;
	expect(offMock).toHaveBeenCalledTimes(2);
	expect(singleMockOn).toHaveBeenCalledTimes(1);
	ob.state.singleOn.active = false;
	expect(singleMockOff).toHaveBeenCalledTimes(1);
	ob.state.singleOn.active = true;
	expect(singleMockOn).toHaveBeenCalledTimes(2);
	expect(onMock).toHaveBeenCalledTimes(2);
	expect(offMock).toHaveBeenCalledTimes(2);
});