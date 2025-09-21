// src/features/home/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Компонент домашней страницы
 * Отображает приветственное сообщение и кнопку для перехода к панели управления
 */
const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center h-screen md:px-20 lg:px-32">
      <div className="flex gap-8 items-center">
        <div className="flex flex-col gap-2 max-w-[520px]">
          <h1 className="font-bold text-3xl">Создайте свое резюме с помощью ИИ</h1>
          <p>
            Упростите процесс создания резюме, используя лучшие функции на основе искусственного
            интеллекта
          </p>
        </div>
        <Link to="/dashboard">
          <Button className="hover:scale-105 hover:shadow-md">
            Начать
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
