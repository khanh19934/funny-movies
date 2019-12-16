import Adapter from "enzyme-adapter-react-16";
import {configure} from "enzyme";

require('jest-enzyme')

configure({adapter: new Adapter()})
