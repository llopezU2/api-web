-- CreateTable
CREATE TABLE "public"."autores" (
    "id_autor" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT,
    "biografia" TEXT,
    "correo" TEXT NOT NULL,

    CONSTRAINT "autores_pkey" PRIMARY KEY ("id_autor")
);

-- CreateTable
CREATE TABLE "public"."categorias" (
    "id_categoria" UUID NOT NULL,
    "nombre_categoria" TEXT NOT NULL,
    "clasificacion" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."libros" (
    "id_libro" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "anio_publicacion" INTEGER NOT NULL,
    "resumen" TEXT,
    "autor_id" UUID NOT NULL,
    "categoria_id" UUID NOT NULL,

    CONSTRAINT "libros_pkey" PRIMARY KEY ("id_libro")
);

-- CreateIndex
CREATE UNIQUE INDEX "autores_correo_key" ON "public"."autores"("correo");

-- AddForeignKey
ALTER TABLE "public"."libros" ADD CONSTRAINT "libros_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."autores"("id_autor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."libros" ADD CONSTRAINT "libros_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
