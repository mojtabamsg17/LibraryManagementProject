package com.example.librarymanagement.mapstruct;


import com.example.librarymanagement.dto.BookDto;
import com.example.librarymanagement.entities.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookMapper {
    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    @Mappings({
            @Mapping(source = "title", target = "title"),
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "balance", target = "balance"),
            @Mapping(source = "bookType.typeName", target = "typeName"),
            @Mapping(source = "author", target = "author"),
            @Mapping(source = "totalBookCount", target = "totalBookCount")
    })
    BookDto sourceToTarget(Book source);

//    @Mappings({
//            @Mapping(source = "title", target = "title"),
//            @Mapping(source = "id", target = "id"),
//            @Mapping(source = "totalBookCount", target = "totalBookCount"),
//            @Mapping(source = "author", target = "author"),
//            @Mapping(target = "mBookType", ignore = true)
//
//    })
//    Book bookDtoToBook(BookDto source);
}
