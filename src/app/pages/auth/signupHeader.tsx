import { Link } from 'react-router-dom';
import clipPathGroup from '@/assets/images/img/clip-path-group.png';
import vector from '@/assets/images/img/vector.png';
import vector1 from '@/assets/images/img/vector-1.png';
import group1000004396 from '@/assets/images/img/group-1000004396.png';
import group1000004397 from '@/assets/images/img/group-1000004397.png';

export const SignupHeader = () => {
  return (
    <header className="fixed w-[390px] h-16 top-0 left-0 bg-[#fff4e6] z-50">
      <div className="flex flex-col w-full h-full items-center justify-center gap-2 px-[22px] py-2">
        <Link to="/" className="w-full h-full flex items-center justify-center">
          <div className="relative w-[175.12px] h-[30.01px]">
            <img
              className="absolute w-5 h-5 top-[3px] left-[9px]"
              alt="Clip path group"
              src={clipPathGroup}
            />
            <img
              className="absolute w-12 h-3.5 top-[7px] left-[35px]"
              alt="Vector"
              src={vector}
            />
            <img
              className="absolute w-[77px] h-[18px] top-2 left-[89px]"
              alt="Vector"
              src={vector1}
            />
          </div>
        </Link>
        <img
          className="absolute w-10 h-[62px] top-0 left-0"
          alt="Group"
          src={group1000004396}
        />
        <img
          className="absolute w-10 h-[62px] top-0 left-[350px]"
          alt="Group"
          src={group1000004397}
        />
      </div>
    </header>
  );
};